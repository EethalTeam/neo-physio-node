const cron = require('node-cron');
const Session = require('../../model/masterModels/Session');
const Review = require('../../model/masterModels/Review');
const Patient = require('../../model/masterModels/Patient');
const Notification = require('../../model/masterModels/Notification');
const Physio = require('../../model/masterModels/Physio');
const RoleBased = require('../../model/masterModels/RBAC');



const getISTDateRange = () => {
    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000; 
    const istNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + offset);
    
    const start = new Date(istNow);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(istNow);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
};

async function broadcastNotification(admins, message, type, meta, io) {
    for (const admin of admins) {
        const notification = await Notification.create({
            toEmployeeId: admin._id,
            message,
            type,
            status: 'unseen', 
            meta
        });

        if (io) {
            
            io.to(admin._id.toString()).emit("receiveNotification", notification);
        }
    }
}

exports.initSessionCron = (io) => {
    cron.schedule('0 20 * * 1-6', async () => {
        try {
            console.log('Running Daily Pending Session & Review Check (8 PM IST)...');
            const { start, end } = getISTDateRange();

            const sessionCompletedId = "691ec69eae0e10763c8f21e0";
            const sessionCancelledId = "692585f037162b40bd30a1ef";
            const reviewCompletedId = "694f85db081ee43cab2d4c8f"; 

            
            const roles = await RoleBased.find({ roleName: { $in: ['Admin', 'Super Admin', 'HOD'] } });
            const roleIds = roles.map(r => r._id);
            const admins = await Physio.find({ roleId: { $in: roleIds }, isActive: true });

            
            const pendingSessions = await Session.find({
                sessionDate: { $gte: start, $lte: end },
                sessionStatusId: { $nin: [sessionCompletedId, sessionCancelledId] }
            }).populate('patientId', 'patientName').populate('physioId', 'physioName');

            
            const pendingReviews = await Review.find({
                reviewDate: { $gte: start, $lte: end },
                reviewStatusId: { $ne: reviewCompletedId }
            }).populate('patientId', 'patientName').populate('physioId', 'physioName');

            
            for (const sess of pendingSessions) {
                const pName = sess.patientId?.patientName || 'N/A';
                const phName = sess.physioId?.physioName || 'N/A';
                const msg = `Physio - ${phName} didn't complete the sessions today, the pending session for the patient - ${pName}`;
                await broadcastNotification(admins, msg, 'Session-Update', { SessionId: sess._id, PatientId: sess.patientId?._id }, io);
            }

            
            for (const rev of pendingReviews) {
                const pName = rev.patientId?.patientName || 'N/A';
                const phName = rev.physioId?.physioName || 'N/A';
                const msg = `Physio - ${phName} has a pending review today for patient - ${pName}`;
                await broadcastNotification(admins, msg, 'Pending-Review', { ReviewId: rev._id, PatientId: rev.patientId?._id }, io);
            }

            console.log(`[8PM Cron] Processed ${pendingSessions.length} sessions and ${pendingReviews.length} reviews.`);
        } catch (error) {
            console.error('Error in 8PM Notification Job:', error);
        }
    }, { timezone: "Asia/Kolkata" });
};

exports.initDailySessionGeneration = () => {
    cron.schedule('0 5 * * 1-6', async () => {
        try {
            console.log('🚀 Starting Daily Session Generation (5 AM IST)...');
            const { start, end } = getISTDateRange();

            const completedStatusId = "691ec69eae0e10763c8f21e0";
            const pendingStatusId = "691ecb36b87c5c57dead47a7"; 

            
            const activePatients = await Patient.find({
                isRecovered: false,
                sessionStartDate: { $lte: end }
            }).sort({ visitOrder: 1 });

            for (const patient of activePatients) {
                
                const exists = await Session.findOne({
                    patientId: patient._id,
                    sessionDate: { $gte: start, $lte: end }
                });

                if (exists) continue;

                
                const completedCount = await Session.countDocuments({
                    patientId: patient._id,
                    sessionStatusId: completedStatusId
                });

                const currentSessionCount = completedCount + 1;

                
                if (patient.totalSessionDays && currentSessionCount > patient.totalSessionDays) {
                    console.log(`Limit reached for ${patient.patientName}. Skipping.`);
                    continue;
                }

                await Session.create({
                    sessionCode: `SESS-${patient.patientCode || 'PAT'}-${Date.now()}`,
                    patientId: patient._id,
                    physioId: patient.physioId,
                    sessionDate: start,
                    sessionDay: start.toLocaleDateString('en-IN', { weekday: 'long' }),
                    sessionTime: patient.sessionTime,
                    targetArea: patient.targetedArea,
                    sessionStatusId: pendingStatusId,
                    sessionCount: currentSessionCount, 
                    modeOfExercise: "General"
                });
            }
            console.log(`[5AM Cron] Daily session records generated.`);
        } catch (error) {
            console.error('Error in 5AM Generation Job:', error);
        }
    }, { timezone: "Asia/Kolkata" });
};
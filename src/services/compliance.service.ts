import Goal from '@/models/Goal';
import dbConnect from '@/db/mongo';

/**
 * Compliance Metrics Interface
 * Defines the structure for patient compliance data
 */
export interface ComplianceMetrics {
    totalGoals: number;
    completedGoals: number;
    complianceRate: number;
    status: 'Goal Met' | 'Missed Preventive Checkup' | 'On Track' | 'Needs Attention';
}

/**
 * Calculates compliance for a given patient.
 * Compares active goals vs completed goals.
 */
export async function getPatientCompliance(patientId: string): Promise<ComplianceMetrics> {
    await dbConnect(); // Ensure DB connection

    // 1. Fetch Goal Counts
    // Note: In a full implementation, we would filter by date range (e.g., this week)
    const totalGoalsCount = await Goal.countDocuments({ patientId });
    const completedGoalsCount = await Goal.countDocuments({ patientId, status: 'completed' });

    // 2. Calculate Rate
    let complianceRate = 0;
    if (totalGoalsCount > 0) {
        complianceRate = (completedGoalsCount / totalGoalsCount) * 100;
    }

    // 3. Determine Status
    let status: ComplianceMetrics['status'] = 'On Track';

    if (complianceRate === 100 && totalGoalsCount > 0) {
        status = 'Goal Met';
    } else if (complianceRate < 50) {
        status = 'Needs Attention';
    }

    // Logic for "Missed Preventive Checkup"
    // Note: Real logic would query a "Reminders" collection for overdue items
    if (complianceRate < 20) {
        status = 'Missed Preventive Checkup';
    }

    return {
        totalGoals: totalGoalsCount,
        completedGoals: completedGoalsCount,
        complianceRate,
        status,
    };
}
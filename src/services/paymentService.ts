import pool from "../config/db";

export const getPaymentsByUserIdService = async (userId: number) => {
    const query = "SELECT * FROM payments WHERE user_id = $1";
    const result = await pool.query(query, [userId]);
    return result.rows;
};

export const getAllPaymentsService = async () => {
    const query = "SELECT * FROM payments";
    const result = await pool.query(query);
    return result.rows;
};

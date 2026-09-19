const pool = require("./src/config/db");

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("Conexión con MySQL exitosa");

        connection.release();

        await pool.end();
    } catch (error) {
        console.error("Error al conectar con MySQL:");
        console.error(error.message);
    }
};

testConnection();
const corsOptions = {
    //Permite que cualquier origen acceda a la API
    origin: true,
    //Permite que la API acceda a la API
    credentials: true,
    //Establece los métodos permitidos en la API
    methods: "GET,POST,PUT,DELETE",
    //Definine los header que el cliente puede enviar
    allowedHeaders: "Content-Type,Authorization"
}

export { corsOptions }
# Developing React Application using Snowflake, SQL API
To expedite the development of Data Apps, Snowflake offers the SQL API, a RESTful API that enables seamless access and manipulation of data within the Snowflake Database. The SQL API serves as a bridge between your application and Snowflake, allowing you to retrieve and update data programmatically. When it comes to authentication, the SQL API supports two methods: OAuth and Key Pair Authentication. OAuth enables you to authenticate your application using industry-standard OAuth protocols, while Key Pair Authentication offers an alternative authentication method specifically for Snowflake.

Here, Key Pair authentication is utilized to authenticate with Snowflake. This authentication method involves using a pair of cryptographic keys: a public key and a private key. The public key is stored within Snowflake, while the private key remains securely stored on your application's server. By presenting the appropriate cryptographic credentials, your application can establish a secure connection with Snowflake and interact with the database using the SQL API.

By leveraging the SQL API with Key Pair Authentication, Snowflake empowers developers to streamline the development process of Data Apps by seamlessly integrating with the Snowflake Database, while ensuring secure and authenticated access to the data.

Snowflake has simplified the integration of machine learning (ML) models into data applications by providing a convenient functionality to deploy ML models as Stored Procedures, User Defined Functions (UDFs), and User Defined Table Functions (UDTFs). This capability allows you to seamlessly incorporate ML models directly within your Snowflake environment.

By deploying ML models as Stored Procedures, UDFs, or UDTFs, you can leverage the power of SQL to execute and utilize these models within your queries and data transformations. This integration allows you to seamlessly combine the analytical capabilities of Snowflake with the predictive power of ML models.

The SQL API offered by Snowflake supports querying Stored Procedures and UDFs, providing a valuable feature when working with deployed ML models. This means that you can easily invoke these ML functions using SQL queries, allowing you to integrate ML predictions and analysis seamlessly into your data applications.

By offering this functionality, Snowflake simplifies the process of incorporating ML models into your data applications, enabling you to leverage the power of machine learning within the Snowflake ecosystem. This integration streamlines the development and execution of ML-powered data workflows, empowering you to extract valuable insights and predictions directly from your Snowflake database.

Let's explore how you can integrate the SQL API into your React/React Native application for querying data or ML models from Snowflake. We'll focus on utilizing SQL queries with Key Pair Authentication.
To use key pair authentication, you need to follow below steps:
1. Set up key-pair authentication: As part of this process, you must Generate a public-private key pair. Assign the public key to your Snowflake user using the command,
    ```
    ALTER USER <USER NAME> SET RSA_PUBLIC_KEY = <Public Key Generated>;
    ```
    After you assign the key to the user, run the below command in Snowflake. In the output, the RSA_PUBLIC_KEY_FP property should be set to the fingerprint of the public key assigned to the user.
    
    ```
    DESCRIBE USER <USER NAME>;
    ```
2. In your application code: Generate a JSON Web Token (JWT) with the following fields in the payload:
    ```
    iss: <Snowflake Account>.<User Name>.<RSA_PUBLIC_KEY_FP from Step 1>
    sub: <Snowflake Account>.<User Name>
    iat: Issue time for the JWT in UTC
    exp: Expiration time for the JWT in UTC
    ```
Refer to Token.js file to find more about how to generate JWT token.
To run the app locally, 
1. Clone the repo using ``` git clone https://github.com/sf-gh-sjasti/ReactApp-Snowflake-SQLAPI.git reactApp ```
2. Navigate to the folder, ``` cd reactApp ```
3. Run ``` npm start ```
4. Launches the app in Web Browser.

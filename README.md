To compile the code, run `tsc` command in the terminal (you can open it using Ctrl+' in VS Code). This will compile the TypeScript files in the `src` directory and generate the corresponding JavaScript files in the `dist` directory.

To execute the tests, run `npm test` in the terminal. This will run all the test files located in the `test` directory.

To start the server, run `npm start` in the terminal. This will start the server and make it available at `http://localhost:5000`. If you navigate to that URL in your web browser, you should see the default `index.html` file located in the `public` directory.

Please note that you should have Node.js installed in your machine to be able to execute these commands.

This project was done as an activity in the Udacity full stack javascript course.

Endpoints link example:

`GET http://localhost:5000/api/images?filename=example.jpg&height=300&width=200`

```
Params:
    filename (string)   // Image filename to resize
    height   (integer)  // Expected resize height to apply on image
    width    (interger) // Expected resize width to apply on image
```

Best regards, Lucas.

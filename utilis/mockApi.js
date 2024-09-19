const mockData = {
  users: [
    {
      id: 1,
      emailAddress: "testuser",
      businessName: "testuser",
      password: "password123",
      token: "mockToken",
    },
  ],
};

function mockRequest(endpoint, method, body) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // console.log(mockData);
        if (endpoint === "/api/login" && method === "POST") {
          const user = mockData.users.find(
            (u) =>
              u.emailAddress === body.emailAddress &&
              u.password === body.password
          );
          if (user) {
            // console.log(mockData);
            resolve({
              status: 200,
              data: {
                user: user,
                token: user.token,
                message: "Login successful",
              },
            });
          } else {
            // console.log(mockData);
            reject({
              status: 401,
              error: "Invalid Email Address or password",
            });
          }
        } else if (endpoint === "/api/signup" && method === "POST") {
          // console.log(mockData);
          const existingUser = mockData.users.find(
            (u) => u.emailAddress === body.emailAddress
          );
          if (existingUser) {
            // console.log(mockData);
            reject({
              status: 409,
              error: "User already exists",
            });
          } else {
            const newUser = {
              id: Date.now(),
              emailAddress: body.emailAddress,
              businessName: body.businessName,
              password: body.password,
              token: `newMockToken${Date.now()}`,
            };
            mockData.users.push(newUser);
            // console.log(mockData);
            resolve({
              status: 201,
              data: {
                user: newUser,
                token: newUser.token,
                message: "Signup successful",
              },
            });
          }
        } else {
          reject({
            status: 404,
            error: "Endpoint not found",
          });
        }
      } catch (error) {
        reject({
          status: 500,
          error: "Internal server error",
        });
      }
    }, 1500);
  });
}

export { mockRequest };

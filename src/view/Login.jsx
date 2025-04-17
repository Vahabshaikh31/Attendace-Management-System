import React from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";

// AcmeLogo component definition
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors = {};

    // Validate password
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validate email (HTML5 will take care of some email validation)
    // You can add custom validations if needed.

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end px-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/hand-drawn-school-supplies-pattern-background_23-2150855728.jpg?t=st=1744826422~exp=1744830022~hmac=c03e70714ceaff3389a8cd1d13b2da5ed3482499c24bb607b12c26fa8b687cc1&w=1380')",
      }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl transform transition-all  ">
        {/* Branding Header */}
        <div className="flex items-center justify-center mb-8">
          <AcmeLogo />
          <p className="font-bold text-2xl ml-2">Attendance Management</p>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <Form
          className="space-y-6 flex flex-col justify-center items-center"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            className="w-full focus:ring-2 focus:ring-purple-300"
          />

          <Input
            isRequired
            errorMessage={getPasswordError(password)}
            isInvalid={getPasswordError(password) !== null}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
            className="w-full focus:ring-2 focus:ring-purple-300"
          />

          <div className="w-full flex items-center">
            <Checkbox
              isRequired
              classNames={{ label: "text-sm text-gray-700" }}
              isInvalid={!!errors.terms}
              name="remember"
              value="true"
            >
              <span className="ml-2">Remember me</span>
            </Checkbox>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms}</span>
          )}

          <div className="flex gap-4 w-full">
            <Button className="w-full" color="primary" type="submit">
              Login
            </Button>
            <Button type="reset" variant="bordered" className="w-full">
              Reset
            </Button>
          </div>
        </Form>

        {submitted && (
          <div className="mt-8 text-sm text-gray-700">
            <p className="font-semibold mb-2">Submitted data:</p>
            <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

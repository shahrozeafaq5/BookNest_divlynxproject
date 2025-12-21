export default function RegisterPage() {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-black text-white py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}

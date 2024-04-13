import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="flex text-2xl justify-center items-center h-screen">
      <Link to="/control" className="mx-4">
        Control
      </Link>
      <Link to="/editor" className="mx-4">
        Editor
      </Link>
      <Link to="/screen" className="mx-4">
        Screen
      </Link>
    </div>
  );
}

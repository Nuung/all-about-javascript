import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; // user instance or null (로그인 안하면 후자)
  if (user === null) {
    return <Navigate to="/login" />
  }
  return children; // 컴포넌트 내부의 instance로 자동 casting
}
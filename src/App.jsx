import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Shared/Loader";
import PrivateRoute from "./components/Shared/PrivateRoute";
import PublicRoute from "./components/Shared/PublicRoute";
import { refreshUser } from "./redux/auth/operations";
import { selectToken } from "./redux/auth/selectors";
import { selectIsLoading } from "./redux/global/selectors";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const HomeTab = lazy(() => import("./pages/HomeTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab"));
const CurrencyTab = lazy(() => import("./pages/CurrencyTab"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={<CurrencyTab />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {isLoading ? <Loader /> : null}
    </>
  );
}

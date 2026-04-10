import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const RecipePage = lazy(() => import("./pages/RecipePage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const Pantry = lazy(() => import("./pages/Pantry.jsx"));

function withRouteFallback(element) {
    return (
        <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            {element}
        </Suspense>
    );
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={withRouteFallback(<Home />)} />
            <Route path="search" element={withRouteFallback(<SearchPage />)} />
            <Route
                path="recipepage"
                element={withRouteFallback(<RecipePage />)}
            />
            <Route
                path="recipe/:id"
                element={withRouteFallback(<RecipePage />)}
            />
            <Route path="account" element={withRouteFallback(<Account />)} />
            <Route path="pantry" element={withRouteFallback(<Pantry />)} />
            <Route
                path="favorites"
                element={<Navigate to="/pantry?tab=favorites" replace />}
            />
            <Route path="login" element={withRouteFallback(<Login />)} />
            <Route path="*" element={withRouteFallback(<NotFound />)} />
        </Route>,
    ),
);

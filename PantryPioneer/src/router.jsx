import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Login from "./pages/Login.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Account from "./pages/Account.jsx";
import Pantry from "./pages/Pantry.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="recipepage" element={<RecipePage />} />
            <Route path="recipe/:id" element={<RecipePage />} />
            <Route path="account" element={<Account />} />
            <Route path="pantry" element={<Pantry />} />
            <Route
                path="favorites"
                element={<Navigate to="/pantry?tab=favorites" replace />}
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Route>,
    ),
);

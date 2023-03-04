import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./styleVariables.css";

import { AnonUserPage } from "./views/AnonUserPage";
import { ExercisesPage } from "./views/ExercisesPage";
import { ExerciseDetailPage } from "./views/ExerciseDetailPage";
import { NewExercisePage } from "./views/NewExercisePage";
import { UserManagementPage } from "./views/UserManagementPage";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { AuthContextProvider } from "./contexts/AuthContext.js";


export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AnonUserPage></AnonUserPage>,
    },
    {
      path: "/exercises",
      element: <ExercisesPage></ExercisesPage>,
    },
    {
      path: "/exercises/:idExercise",
      element: <ExerciseDetailPage></ExerciseDetailPage>,
    },
    {
      path: "/newExercise",
      element: <NewExercisePage></NewExercisePage>,
    },
    {
      path: "/users",
      element: <UserManagementPage></UserManagementPage>
    }
  ]);

  return (
    <>
      <AuthContextProvider>
        <Header></Header>
        <main>
          <RouterProvider router={router} />
        </main>
        <Footer></Footer>
      </AuthContextProvider>
    </>
  );
}

import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./styleVariables.css";

import { AnonUser } from "./views/AnonUser";
import { Exercises } from "./views/Exercises";
import { ExerciseDetail } from "./views/ExerciseDetail";
import { NewExerciseAdmin } from "./views/NewExerciseAdmin";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AnonUser></AnonUser>,
    },
    {
      path: "/exercises",
      element: <Exercises></Exercises>,
    },
    {
      path: "/exercises/:idExercise",
      element: <ExerciseDetail></ExerciseDetail>,
    },
    {
      path: "/newExercise",
      element: <NewExerciseAdmin></NewExerciseAdmin>,
    },
  ]);

  return (
    <>
      <Header user={"WIP-login-state/context"}></Header>
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer></Footer>
    </>
  );
}

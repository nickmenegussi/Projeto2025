import React from "react";
import Card from "../components/Card";
import { Book, Library, Speech, Users } from "lucide-react";
import { Typography } from "@material-tailwind/react";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col p-6 gap-5 bg-gray-100 overflow-scroll">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <Card
            title="Livros Disponíveis"
            icon={<Library color="blue" />}
            content={"150"}
          />
          <Card
            title="Usuários Registrados"
            icon={<Users color="blue" />}
            content={"150"}
          />
          <Card
            title="Total de Palestras"
            icon={<Speech color="blue" />}
            content={"350"}
          />
          <Card
            title="Empréstimos"
            icon={<Speech color="blue" />}
            content={"350"}
          />
          <Card
            title="Reservas"
            icon={<Speech color="blue" />}
            content={"350"}
          />
        </div>
      <footer className="w-full bg-gray-100 p-8 ">
          <div className="flex flex-row flex-wrap items-center justify-center gap-y-6  bg-gray-100 text-center md:justify-between">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="logo-ct"
              className="w-10"
            />
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  About Us
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  License
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Contribute
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Contact Us
                </Typography>
              </li>
            </ul>
          </div>
          <hr className="my-8 border-blue-gray-50" />
          <Typography color="blue-gray" className="text-center font-normal">
            &copy; 2023 Material Tailwind
          </Typography>
        </footer>
        <footer className="w-full bg-gray-100 p-8">
          <div className="flex flex-row flex-wrap items-center justify-center gap-y-6  bg-gray-100 text-center md:justify-between">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="logo-ct"
              className="w-10"
            />
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  About Us
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  License
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Contribute
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Contact Us
                </Typography>
              </li>
            </ul>
          </div>
          <hr className="my-8 border-blue-gray-50" />
          <Typography color="blue-gray" className="text-center font-normal">
            &copy; 2023 Material Tailwind
          </Typography>
        </footer>
        </div>

    </>
  );
};

export default Dashboard;

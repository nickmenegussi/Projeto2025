import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { Library } from "lucide-react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router";
import SessionExpiredModal from "../components/SessionExpiredModal";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 w-full md:ml-64">
        <div className="p-6 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="font-bold text-2xl mb-10">Dashboard</h1>
          <div className="grid grid-cols-3 gap-4 mb-4 w-full">
              <Card
                title="Livros Disponíveis"
                icon={<Library color="blue" />}
                content={"150"}
              />
              <Card
                title="Livros Disponíveis"
                icon={<Library color="blue" />}
                content={"150"}
              />
              <Card
                title="Livros Disponíveis"
                icon={<Library color="blue" />}
                content={"150"}
              />
              <Card
                title="Livros Disponíveis"
                icon={<Library color="blue" />}
                content={"150"}
              />
              <Card
                title="Livros Disponíveis"
                icon={<Library color="blue" />}
                content={"150"}
              />            
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 w-full">
            {/* Outros itens aqui */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import api from "../../services/api";

export const fetchVolunteerWork = async () => {
  try {
    const token = await localStorage.getItem("@Auth:token");

    const response = await api.get("/volunteerWork/work", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};
export const addLecture = async (
  nameVolunteerWork,
  address,
  dateVolunteerWork,
  timeVolunteerWork,
  work_description
) => {
  try {
    const token = await localStorage.getItem("@Auth:token");
    const response = await api.post(
      "/VolunteerWork/work/create",
      {
        nameVolunteerWork,
        address,
        dateVolunteerWork,
        timeVolunteerWork,
        work_description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};

export const deleteVolunteerWork = async (LibraryId) => {
  try {
    const token = localStorage.getItem("@Auth:token");
    const response = await api.delete(
      `/VolunteerWork/work/${LibraryId}/delete`,
      {
        LibraryId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};

export const updateLecture = async (idVolunteerWork, field, value) => {
  try {
    const response = await api.patch(
      `/VolunteerWork/work/${idVolunteerWork}/${field}`,
      {
        [field]: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        navigate("/auth/login");
      } else {
        console.log("Erro", error.response.data);
        alert("Erro", error.response.data.message);
        return null;
      }
    } else {
      alert(`Erro na requisição: `, error);
      console.log("Erro", error);
      return null;
    }
  }
};

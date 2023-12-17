import Task from "../models/task.js";
export const show = async (req, res) => {
  const taskAll = await Task.find({
    user: req.user.id,
  }).populate("user"); //Buscar el usuario de una vez
  return res.status(200).send(taskAll);
};
export const showId = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).populate("user");
    if (!task) {
      return res.status(200).json({
        status: "error",
        msj: "Tarea no encontrada",
      });
    }
    return res.status(200).json({
      status: "ok",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "error",
    });
  }
};
export const store = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const newCreated = await newTask.save();
    return res.status(200).json({
      status: "ok",
      task: {
        title: newCreated.title,
        description: newCreated.description,
        date: newCreated.date,
        id: newCreated._id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "error",
    });
  }
};
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const taskNew = req.body;
    const taskFound = await Task.findByIdAndUpdate(id, taskNew, {
      new: true,
    });
    if (!taskFound) {
      return res.status(200).json({
        status: "error",
        msj: "No encontrado",
      });
    }
    return res.status(200).json({
      status: "ok",
      msj: "Actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "error",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const taskFound = await Task.findByIdAndDelete(id);
    if (!taskFound) {
      return res.status(200).json({
        status: "error",
        msj: "No encontrado",
      });
    }
    return res.status(200).json({
      status: "ok",
      msj: "Eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "error",
    });
  }
};

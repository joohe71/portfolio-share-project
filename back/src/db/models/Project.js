import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";

class Project {
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByProjectId({ project_id }) {
    const project = await ProjectModel.findOne({ id: project_id });
    return project;
  }

  static async update({ project_id, fieldToUpdate, newValue }) {
    const filter = { id: project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async findByUserId({ user_id }) {
    const projects = await ProjectModel.find({ user_id });
    return projects;
  }
}

export { Project };

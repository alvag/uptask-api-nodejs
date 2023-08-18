import { Schema, model } from 'mongoose';

interface ProjectModel {
    name: string;
    description: string;
    deadline: Date;
    client: string;
    createdBy: Schema.Types.ObjectId;
    collaborators: Schema.Types.ObjectId[];
    isCompleted: boolean;
}

const projectSchema = new Schema<ProjectModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        client: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        collaborators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Project = model('Project', projectSchema);
export default Project;

import { Schema, model } from 'mongoose';

interface TaskModel {
    name: string;
    description: string;
    status: string;
    deadline: Date;
    priority: string;
    project: Schema.Types.ObjectId;
}

const taskSchema = new Schema<TaskModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'completed'],
        },
        deadline: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ['low', 'medium', 'high'],
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.methods.toJSON = function () {
    const task = this.toObject();
    task.uid = task._id;
    delete task._id;
    delete task.__v;
    return task;
};

const Task = model('Task', taskSchema);
export default Task;

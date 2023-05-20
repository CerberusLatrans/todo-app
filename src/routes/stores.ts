import { writable } from 'svelte/store';

/**
 * STORES OVERVIEW
 * LIST of Folders or TaskLists IDs
 *  - add list
 *  - delete list
 *  - add folder
 *  - delete folder
 * MAP from TaskList IDs to TaskLists
 *  - set TaskList
 * MAP from Task IDs to Tasks
 *  - set Task
 */

function makeExampleData() {
    let home: (number | Folder)[] = [];
    let listsMap: Map<number, TaskList> = new Map();
    let tasksMap: Map<number, Task> = new Map();

    let list0 = new TaskList();
    list0.tasks = [new Task("Task A"), new Task("Task B"), new Task("Task C")];
    let list1 = new TaskList();
    list1.tasks = [new Task("Task D"), new Task("Task F"), new Task("Task E")];

    listsMap.set(list0.id, list1);
    listsMap.set(list1.id, list2);

    home.push(list0.id, list1.id)
    return [home, listsMap, tasksMap];
}

let exampleData = makeExampleData();

function createHome(data: (number | Folder)[]) {
	const { subscribe, set, update } = writable(data);

	return {
		subscribe,
        update,
		insertItems: (idx: number, items: (number | Folder)[]) => update(
            l => {
                l.splice(idx, 0, ...items)
                return l;
            }),
		deleteItems: (idx: number) => update(
            l => {
                let poppedTasks: number[] = []
        for (let idx of idxs) {
            poppedTasks.push(this.taskIDs.splice(idx, 1)[0]);
        }
        return poppedTasks;
            }),
	};
}

function createTaskListsMap(data: Map<number, TaskList>) {
	const { subscribe, set, update } = writable(data);

	return {
		subscribe,
		setTaskList: (tlID: number, tl: TaskList) => update(
            tlm => {
                tlm.set(tlID, tl);
                return tlm;
            }),
	};
}

function createTasksMap(data: Map<number, Task>) {
	const { subscribe, set, update } = writable(data);

	return {
		subscribe,
		setTask: (tID: number, t: Task) => update(
            tm => {
                tm.set(tID, t);
                return tm;
            }),
	};
}

export const folderDirs = createHome(exampleData[0]);
export const taskListsMap = createTaskListsMap(exampleData[1]);
export const tasksMap = createTasksMap(exampleData[2]); 

export class Folder {
    static count = 0;
    id = Folder.count;
    name: string = "Folder " + this.id;
    taskLists: (number | Folder)[] = [];

    constructor() {
        Task.count += 1;
    }
}
export class TaskList {
    static count = 0;
    id = TaskList.count;
    name: string = "Task List " + this.id;
    description: string = "";
    taskIDs: number[] = [];
    graveyardIDs: number[] = [];

    constructor() {
        Task.count += 1;
    }

    moveIDs(from: number[], destination: number): void {
        let poppedTaskIDs: number[] = this.popIDs(from);
        this.taskIDs = this.taskIDs.splice(destination, 0, ...poppedTaskIDs);
    }

    popIDs(idxs: number[]): number[] {
        let poppedTasks: number[] = []
        for (let idx of idxs) {
            poppedTasks.push(this.taskIDs.splice(idx, 1)[0]);
        }
        return poppedTasks;
    }

    insertIDs(idx: number, newTaskIDs: number[]): void {
        this.taskIDs.splice(idx, 0, ...newTaskIDs);
    }

    killTaskID(idx: number): void {
        let targetTaskID = this.popIDs([idx])[0];
        this.graveyardIDs.push(targetTaskID);
    }

    reviveTaskID(idx: number): void {
        let deadTaskID = this.graveyardIDs.splice(idx, 1)[0];
        this.taskIDs.push(deadTaskID);
    }
}

// task class
export class Task {
    static count = 0;

    name: string;
    id = Task.count;
    description: string = ""; 
    priority: boolean = false;
    creationTime: Date = new Date();

    completionTime?: Date;
    startTime?: Date;
    dueTime?: Date;

    task_list: number[] = [];

    constructor(name: string) {
        this.name = name;
        Task.count += 1;
    }   
}
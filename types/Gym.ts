export type Muscle =
 | "chest"
 | "back"
 | "shoulders"
 | "biceps"
 | "triceps"
 | "legs"
 | "abs";

export interface BaseExercise {
 name: string;
 image: string;
 video: string;
 muscleGroups: Muscle[];
}

export interface Exercise extends BaseExercise {
 sets: number;
 reps: number;
 weight: number;
 time: number;
}

export interface BaseWorkout {
 name: string;
 exercises: BaseExercise[];
}

export interface Workout extends BaseWorkout {
 exercises: Exercise[];
 totalTime: number;
}

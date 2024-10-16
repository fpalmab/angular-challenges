import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  StudentState,
  studentAdapter,
  studentsFeatureKey,
} from './student.reducer';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  studentAdapter.getSelectors();

const selectStudentState =
  createFeatureSelector<StudentState>(studentsFeatureKey);

const selectStudents = createSelector(selectStudentState, selectAll);

export const StudentSelectors = {
  selectStudents,
};

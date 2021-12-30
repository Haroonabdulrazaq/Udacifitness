export const RECEIVE_ENTRY = 'RECEIVE_ENTRY';
export const ADD_ENTRY= 'ADD_ENTRY';

export function receiveEntry(entires){
  return {
    type: RECEIVE_ENTRY,
    entires
  }
}

export function addEntry(entiry){
  return {
    type: ADD_ENTRY,
    entires
  }
}
import { BoardType } from '../types';

export function canDrop({
  dragBoardType,
  dropBoardType,
}: {
  dragBoardType: BoardType;
  dropBoardType: BoardType;
}) {
  switch (dragBoardType) {
    case 'todos': {
      return (['todos', 'inProgress'] as BoardType[]).includes(dropBoardType);
    }
    case 'inProgress': {
      return (['todos', 'inProgress', 'done'] as BoardType[]).includes(
        dropBoardType,
      );
    }
    case 'done': {
      return (['done'] as BoardType[]).includes(dropBoardType);
    }
  }
}

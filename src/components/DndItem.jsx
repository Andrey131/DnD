import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '@chakra-ui/react';
import ItemTypes from './ItemTypes';

const DndItem = function ({
  id,
  text,
  index,
  moveCard,
  colIndex,
  backgroundColor,
}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragColumnIndex = item.colIndex;
      const hoverColumnIndex = colIndex;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex, dragColumnIndex, hoverColumnIndex);
      /* eslint-disable no-param-reassign */
      item.colIndex = hoverColumnIndex;
      item.index = hoverIndex;
      /* eslint-enable no-param-reassign */
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index, colIndex }),
    isDragging: (monitor) => id === monitor.getItem().id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <Box
      ref={ref}
      backgroundColor={backgroundColor}
      w="80%"
      opacity={isDragging ? 0 : 1}
      border="1px"
      ml="auto"
      mr="auto"
      p={2}
      mb={2}
      color="black"
      cursor="move"
      data-handler-id={handlerId}
    >
      {text}
    </Box>
  );
};

export default DndItem;

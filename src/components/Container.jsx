import { Grid, Button, GridItem } from '@chakra-ui/react';
import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import DndItem from './DndItem';

const Container = function () {
  const [items, setItems] = useState([
    [
      {
        id: 1,
        text: '1',
        color: 'red.100',
      },
      {
        id: 2,
        text: '2',
        color: 'red.200',
      },
      {
        id: 3,
        text: '3',
        color: 'red.300',
      },
      {
        id: 4,
        text: '4',
        color: 'red.400',
      },
    ],
    [
      {
        id: 5,
        text: '5',
        color: 'red.500',
      },
      {
        id: 6,
        text: '6',
        color: 'red.600',
      },
      {
        id: 7,
        text: '7',
        color: 'red.700',
      },
    ],
  ]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex, dragColumnIndex, hoverColumnIndex) => {
      const dragCard = items[dragColumnIndex][dragIndex];

      setItems(
        dragColumnIndex === hoverColumnIndex
          ? update(items, {
            [dragColumnIndex]: {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
              ],
            },
          })
          : update(items, {
            [dragColumnIndex]: {
              $splice: [[dragIndex, 1]],
            },
            [hoverColumnIndex]: {
              $splice: [[hoverIndex, 0, dragCard]],
            },
          }),
      );
    },
    [items],
  );

  const getRandomInt = (max) => {
    let result = Math.floor(Math.random() * max);
    if (result > 0) {
      return result;
    }
    result = getRandomInt(max);

    return result;
  };

  const renderCard = (card, index, colIndex) => (
    <DndItem
      backgroundColor={card.color}
      key={card.id}
      index={index}
      id={card.id}
      text={card.text}
      moveCard={moveCard}
      colIndex={colIndex}
    />
  );

  const addItem = (newItemParam) => {
    const newItem = newItemParam;
    newItem.color = `red.${getRandomInt(9) * 100}`;
    setItems(
      update(items, {
        0: {
          $push: [newItem],
        },
      }),
    );
  };

  return (
    <Grid
      pt={2}
      borderWidth="1px"
      borderRadius="lg"
      w="400px"
      minH="600px"
      templateColumns="1fr 1fr"
      templateRows="50px auto"
      ml="auto"
      mr="auto"
    >
      <Button
        ml="auto"
        mr="auto"
        onClick={() => addItem({
          id: items[0].length + items[1].length + 1,
          text: items[0].length + items[1].length + 1,
        })}
      >
        Add
      </Button>

      <GridItem rowStart={2} p={2} backgroundColor="blue.800">
        {items[0].map((card, i) => renderCard(card, i, 0))}
      </GridItem>

      <GridItem rowStart={2} p={2} backgroundColor="blue.700">
        {items[1].map((card, i) => renderCard(card, i, 1))}
      </GridItem>
    </Grid>
  );
};

export default Container;

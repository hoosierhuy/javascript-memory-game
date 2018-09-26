describe("Simulated Data", () => {
  const cards = [
    {
      name: '4Runner',
      img: 'images/4runner.jpg',
      id: 1,
    },
    {
      name: 'sequoia',
      img: 'images/sequoia.JPG',
      id: 2
    },
    {
      name: 'audi',
      img: 'images/audi.jpg',
      id: 3
    },
    {
      name: 'tacoma',
      img: 'images/tacoma.jpg',
      id: 4
    },
    {
      name: 'mr2',
      img: 'images/mr2.jpg',
      id: 5
    },
    {
      name: 'accord',
      img: 'images/accord.jpg',
      id: 6
    }
  ];
  
  it("contains a array of objects called 'cards'", () => {
    expect(cards.length).toBe(6);
  });
});

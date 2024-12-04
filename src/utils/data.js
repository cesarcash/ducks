const data = {
  ducks: [
    {
      id: 0,
      name: "Pato Perro",
      description:
        'Este raro pato se ha visto en toda Europa central en repetidas ocasiones. Se dice que disfruta jugando con los calcetines viejos que encuentra en el agua. Tanya Peterson tenía 25 años cuando vio este pato y dijo: "Era un pequeño muy amigable. En ningún momento sentí miedo alguno. Me quedé con él unos 15 o 20 minutos, y después, ¡zum! Salió del agua y cruzó el cielo nocturno como un cometa.',
      img: new URL("../assets/images/dog-duck.png", import.meta.url).href,
    },
    {
      id: 1,
      name: "Pato Cebra",
      description:
        "Esta bella y asustadiza criatura ha sido avistada en África central. Expertos cryptoduckólogos aseguran que el mejor momento para observar a este magnífico graznador es cuando la luna llena se halla en su punto más alto en una noche sin viento.",
      img: new URL("../assets/images/zebra-duck.png", import.meta.url).href,
    },
    {
      id: 2,
      name: "Pato Jirafa",
      description:
        'Este es uno de los cryptoducks más altos de los que se tiene registro. Un testigo visual informó sobre un encuentro desgarrador con tal criatura. Thomas Maltese y su familia se encontraban acampando en Nueva Jersey durante el verano de 1962: «acababa de acostar a los niños cuando oí un crujido procedente de un matorral cercano. Alumbré en esa dirección con mi linterna y ahí estaba. Su cuello medía, al menos, un metro de largo. Aún recuerdo su graznido… ¡oh, su terrible, terrible graznido! Aquella noche cambió mi vida."',
      img: new URL("../assets/images/giraffe-duck.png", import.meta.url).href,
    },
    {
      id: 3,
      name: "Pato OVNI",
      description:
        "Muchos han avistado este pato. Nadie sabe el motivo por el que siguen visitándonos. Quizás sean observadores pacíficos, quizás tengan intenciones más siniestras. Es posible que jamás lo sepamos.",
      img: new URL("../assets/images/ufo-duck.png", import.meta.url).href,
    },
  ],
};

export default data;

const Default = (content: string) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Scrim</title>
        </head>
        <body>
        <div>
            <h1>Scrim</h1>
            <p>${content}</p>
        </div>
        </body>
        </html>
    `;
};

const template = {
  default: Default,
};

export default template;

const options = {year: `numeric`, month: `long`, day: `numeric`};

export const reformatDate = (date) => new Intl.DateTimeFormat(`en-EN`, options).format(new Date(date));

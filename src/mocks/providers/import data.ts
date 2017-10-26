let samples: any = [
    {
        "about": "Burt is a cute Bear.",
        "name": "Burt Bear",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Fbear.jpg?alt=media&token=30e4ba89-8064-4ff0-a119-416b3fb8420c"
    },
    {
        "about": "Charlie is a mad Cheetah.",
        "name": "Charlie Cheetah",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Fcheetah.jpg?alt=media&token=fd33b584-e30e-4d30-b95f-fb0e67b73eff"
    },
    {
        "about": "Donald is a Duck.",
        "name": "Donald Duck",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Fduck.jpg?alt=media&token=90672235-5752-48bc-ab55-c1d9084f45a4"
    },
    {
        "about": "Eva is an Eagle.",
        "name": "Eva Eagle",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Feagle.jpg?alt=media&token=5274ba2b-649a-44cb-8ccb-16d4b04ed296"
    },
    {
        "about": "Ellie is an Elephant.",
        "name": "Ellie Elephant",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Felephant.jpg?alt=media&token=5789c6f8-acb5-49b0-94ed-bc0e5963e76d"
    },
    {
        "about": "Molly is a Mouse.",
        "name": "Molly Mouse",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Fmouse.jpg?alt=media&token=abfc6ecc-ea11-4584-97f5-4deb92a7e2fa"
    },
    {
        "about": "Paul is a Puppy.",
        "name": "Paul Puppy",
        "profilePic": "https://firebasestorage.googleapis.com/v0/b/newapp-9dd01.appspot.com/o/speakers%2Fpuppy.jpg?alt=media&token=a5e4e7cc-1972-405f-972d-a69da3b16124"
    }
];

this.samples.forEach(element => {
    this.db.list('users').push({
        name: element.name,
        about: element.about,
        profilePic: element.profilePic
    });
});
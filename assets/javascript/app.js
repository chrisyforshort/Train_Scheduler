$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBkQXSwdYrdVjEnx1Yb-TqMgdCxQpxdQh8",
    authDomain: "trainschedule-172e2.firebaseapp.com",
    databaseURL: "https://trainschedule-172e2.firebaseio.com",
    projectId: "trainschedule-172e2",
    storageBucket: "trainschedule-172e2.appspot.com",
    messagingSenderId: "236087521437"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

      // Capture Button Click
      $("#submit").on("click", function (event) {
        event.preventDefault();
        // Capture User Inputs and store them into variables
        var input1 = $("#trainname").val().trim();
        var input2 = $("#destination").val().trim();
        var input3 = $("#firstTrain").val().trim();
        var input4 = $("#frequency").val().trim();
        // var input5 = moment().diff(moment.unix(input3, "X"), "months"); 
        $("#trainname").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
        database.ref().push({
            name: input1,
            destination: input2,
            firstTrain: input3,
            frequency: input4,
            // time: input5,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        database.ref().on("child_added", function(childSnapshot, prevChildKey){
              // Store everything into a variable.
            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var trainFirst = childSnapshot.firstTrain;
            var trainFrequency = childSnapshot.val().frequency;
            var trainAdded = childSnapshot.val().dateAdded;
            // console.log(trainTime)
            console.log(trainFirst)
            console.log(trainAdded)

            var trainConverted = moment(trainFirst, "hh:mm a").subtract("1, years")
            var difference = moment().diff(moment(trainConverted), "minutes")
            var currentTime= moment()
            var remainder = difference % trainFrequency
            var minutesUntil = trainFrequency - remainder
            var nextTrain = moment().add(minutesUntil, "minutes").format("hh:mm")
        // Output all of the new information into the relevant HTML sections
        $("#trainSchedule").append("<tr><th>" + trainName + "</th><th>" + trainDestination + "</th><th>" + trainFrequency + "</th><th>" + nextTrain + "</th><th>" + minutesUntil + "</th></tr>")

        })
        return false
    })

    database.ref().on("value", function(snap){
        // for var i
        $("#trainSchedule").append("<tr><th>" + snap.val().name + "</th><th>" + snap.val().frequency + "</th><th>" + snap.val().name + "</th><th>" + snap.val().name + "</th><th>" + snap.val().name + "</th></tr>")
        console.log(snap.val())
    })
})
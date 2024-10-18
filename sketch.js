//ml5.js

let bodyPose;
let poses = [];
let connections;

function preload() {
  // Load the handPose model
  bodyPose = ml5.bodyPose("BlazePose", { flipped: true });
}

function getPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  bodyPose.detectStart(video, getPoses);
  connections = bodyPose.getSkeleton();
  console.log(connections);
}

function draw() {
  image(video, 0, 0);

  if (poses.length > 0) {
    let pose = poses[0];
    let x = pose.nose.x;
    let y = pose.nose.y;
    fill(255, 0, 0);
    circle(x, y, 20);

    for (let i = 0; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];
      fill(0, 0, 255);
      if (keypoint.confidence > 0.1) {
        circle(keypoint.x, keypoint.y, 12);
      }
    }
    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      let a = connection[0];
      let b = connection[1];
      let keypointA = pose.keypoints[a];
      let keypointB = pose.keypoints[b];
      stroke(0, 255, 0);
      strokeWeight(4);
      if (keypointA.confidence && keypointB.confidence > 0.1) {
        line(keypointA.x, keypointA.y, keypointB.x, keypointB.y);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(400, 400);
}

# Crystal App 

## Vision and Planning:

This application visualizes the refractory changes that take place as a crystal is rotated along the axis of a polarized light beam that is projected from the bottom-up. The user drags to rotate a crystal 360 degrees around its fixed point. As it rotates, updates are made to the crystal’s optical indicatrix - shown by an ellipsoid that rotates along with the crystal (shown on the left and middle of the window). Changes made to the indicatrix’s orientation modify the height and width of its central cross section (shown on the middle and the right).



All elements are rendering simultaneously, giving the user the ability to visualize how every aspect of the crystal changes as its dragged in any direction.




Outstanding major bugs/issues/missing features for this application as of 12/18/2017 are as follows:

 

* The middle-shape cross section does not expand perfectly to fit the ellipsoid - there’s a little bit of overlap that needs to be corrected
* More prism shapes and cross sections can be added as features
* Mobile device porting could be enabled
* App is only working verifiably on Chrome browser, other browser testing and implementation could be done
_ There is known issue with Safari where objects are not being removed from the canvas correctly
* Key controls could be implemented in addition to mouse controls
* UI/Design aesthetic improvements could be made with more time
* The ON/OFF switch could be programmed to hold the same setting as crystal structures are changed (instead of resetting every time)



Design and functionality ideas for this app at the beginning of the semester match our final project almost exactly. Future development on this app should be primarily concerned with added un-implemented crystal structures




## User Teaching/Documentation:

This app is intended for use by experienced geology students who will have background education on what each of the crystal properties are and what they represent. Here is a quick set of definitions for each element:

 

**The Crystal:** Represented by the changeable 3D wireframe structure. The crystal is main element that is dragged.

 

**The Optical Indicatrix:** Represented by the two ellipsoids (one freestanding and one embedded). The optical indicatrix describes the refractory property of the crystal, it is not an actual feature of it. It rotates along with the crystal and shows how the polarized light is refracted via its cross section.

 

**The Cross Section:** This is the portion of the indicatrix which is illuminated by the polarized light. It changes size with respect to how the crystal and the indicatrix are rotated.

 

## FAQ/Miscellaneous Help

How to launch this app:

This app is launched by opening the ‘index.html’ file included in the repository.

 

U/I Overview:

The app launches into a screen with an “About” button at the top left, four crystal buttons below that, the an ON/OFF switch, and then a crystal and ellipsoid shown in the middle. 

 

How to change Crystal Structures:

Clicking a button will load the crystal structure that it represents. The default is hexagonal.

 

How to move the crystal:

A crystal can be rotated by holding down the mouse and dragging.

 

How to view the cross section:

The ON/OFF switch turns the light beam on/off - i.e. it toggles the appearance of the cross section on/off. You’ll have to re-toggle it for each crystal structure.

 

How to view documentation:

The “About” button takes the user to this document




## Developer Documentation

The application is split into five main sections: app, images, lib, style, and the html pages. After pulling the code from our GitHub repository, a developer can open it in any IDE to their liking and edit each component. Here’s a breakdown of what each part does:

 

app: 

The app folder contains only the crystal.js file. This is a javascript file which holds all of the three.js code for objects, meshes, canvas dimensioning, rendering, display, and so on. The graphical rendering elements of the project (e.g. the crystal, the ellipsoids, etc.) can all be modified here.

 

images: 

Holds the image files that we use to display the buttons and labels we use. None of the moving graphical elements (i.e. the ones controlled by three.js) are found here. Use this folder to add new non-three.js graphics.

 

lib: 

Necessary files for three.js. No edits recommended.

 

style:

Controls the CSS settings. No edits recommended.

 

The html files:

about.html: holds the documentation text you’re seeing here. Edit the html code to add to/remove from the documentation 

Index.html: Launches the app in browser. This file controls the html elements which we display in the app (the on/off switch, the buttons, etc.). It also controls which crystal structure is being displayed. Edit this file in order to change displayed elements for the whole window.

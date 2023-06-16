<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Ahmad45123/EduXR">
    <h1>EduXR</h1>
  </a>

  <p align="center">
    A (science) experiments designing platform where teachers can create AR experiments via a visual programming language.
    <br />
    <a href="https://github.com/Ahmad45123/EduXR/blob/main/bachelor_thesis.pdf"><strong>Explore the thesis »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/04YK2Y3y8Q4">View Demo</a>
    ·
    <a href="https://github.com/Ahmad45123/EduXR/issues">Report Bug</a>
    ·
    <a href="https://github.com/Ahmad45123/EduXR/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#motivation">Motivation</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- Motivation -->
## Motivation
Experiments are crucial for STEM students in order to understand different science concepts. However, teachers often have the limit the scope of their experiments due to hazards such as fire, electricity or poisoning. Money shortage could also be a problem because experiment materials are both consumable and expensive.

Thus, we suggested creating EduXR, a platform targetted for designing and playing experiments in both Augmented Reality and Virtual Reality using the Oculus Headset.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->
## About The Project
EduXR is a platform developed for teachers to create experiments in both AR and VR. The platform consists of two applications:
1. Designer Web App: A web app that has the designer. The web app would consist of a scene editor with support for a drag and drop Visual Programing Language. A unity instance would also be embedded in the web app for live preview of changes.
2. Player App: Built for the oculus quest and has support for hand tracking and running the scenes designed in the designer.

Please check out the thesis or the video linked above for a preview on how the platform works!

### What's up with the name? EduXR or EduAR?
The original name was simply EduAR. However, we have found that using XR is more generic as it means Extended Reality and does include VR in it. In case the platform ever also adds support for simple VR using custom envirnoments. Think maybe doing the experiments inside a virtual lab. You'll find that we use both names interchangably often.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
The platform consists of three main applications: 
1. The designer web app built using React, among other libraries.
2. The designer preview unity app built for WebGL to run embedded in the designer.
3. The player app built on Unity for the Oculus Quest platform!

### Prerequisites
- An Oculus Quest 2 to run the player application. _(Quest 3 should theoritically work)_
- A Firebase Storage and Firestore account as it is required for the sync in between the designer and player app.
- Unity Editor 2021.3.22f1
- Nodejs (+npm)

### Installation
1. First build the EditorRenderer app which is the WebGL build. This is the preview app that appears inside the designer.
    - Building this is as simple as opening the folder `EditorRenderer` in Unity and building it targetting Unity.
    - The built files should be placed in https://github.com/Ahmad45123/EduXR/tree/main/Designer/public/renderer where the index html file would exist at `Designer/public/renderer/index.html`.

2. The designer app itself needs firebase access in order to run properly.
    - First get firebase access tokens and then place them at the file `Designer\src\firebaseConfig.ts`.
    - Then the designer could be easily started using `npm install && npm run start`.
4. Finally the player app is built in Unity by first opening the folder and then allowing all assets to download. Then build it using the Oculus Quest as a target platform and then run it. Prior experience with Oculus would be beneficial. 
     - For it to run, you also need to connect it to firebase. Add firebase connection data to the file: `Player/Assets/google-services.json`.

Briefly, you only need to do this in order to get the platform running. Please file an issue for more details or questions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
Unfortunately, we do not offer a public build of the Designer. You must build the source code from scratch if you want to try it out. However, a build of the player app is available in the Releases tab. **You MUST have an Oculus Quest 2 headset and know your way about installing an APK on the headset.**

Some sample experiments are available on the headset for trying. These experiments were completely built using the designer. Check the thesis for details on how some of them were built.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
The project is NOT in active development. However, the following ideas are things that would be looked up next: 
- [ ] Add proper users and permission system.
- [ ] UI Improvements.
- [ ] Add reusable components to the visual programming language.
- [ ] Proper error checking and fail recovery.
- [ ] Support for Oculus Quest 3. Will add colored passthrough!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU General Public License v3.0. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Ahmed Elwasefi - [@AhmedElwasefi](https://twitter.com/AhmedElwasefi) - ahmad.alwasifi@gmail.com

Project Link: [https://github.com/Ahmad45123/EduXR](https://github.com/Ahmad45123/EduXR)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Ahmad45123/EduXR.svg?style=for-the-badge
[contributors-url]: https://github.com/Ahmad45123/EduXR/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Ahmad45123/EduXR.svg?style=for-the-badge
[forks-url]: https://github.com/Ahmad45123/EduXR/network/members
[stars-shield]: https://img.shields.io/github/stars/Ahmad45123/EduXR.svg?style=for-the-badge
[stars-url]: https://github.com/Ahmad45123/EduXR/stargazers
[issues-shield]: https://img.shields.io/github/issues/Ahmad45123/EduXR.svg?style=for-the-badge
[issues-url]: https://github.com/Ahmad45123/EduXR/issues
[license-shield]: https://img.shields.io/github/license/Ahmad45123/EduXR.svg?style=for-the-badge
[license-url]: https://github.com/Ahmad45123/EduXR/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Ahmad45123
[product-screenshot]: images/screenshot.png

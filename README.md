# [FundAfirkaApp](https://fundafrika.web.app/login)


Is a platform that exist to enhance the learning of our generation through their mother toung. We promote indeginous understanding of our scientific world.

This application allows teacher's to upload tutorial leasons recorded in their own language. Then allows a student to come in the platform and study/learn concepts in their own language.

## Development

Please make sure you have nodejs and git intalled in your machine

Clone the project using `git clone https://github.com/{your-git-username}/fundafrika.git`

Get into the project using `cd FundAfrikaApp`

Install all dependencies `npm install`

Install firebase tools `npm install -g firebase-tools`

Login to firebase so that you can test `firebase login`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

After making the changes
Prepare for deployment

Make sure you run 
`ng build --prod`
before pushing the code to make sure everything is correct syntax wise

Add changed files to git `git add .`

Commit the files `git commit -m 'the-change-you-made'`

If you haven't added the repo

run `git add remote https://github.com/{your-git-username}/fundafrika.git`

Push changes `git push -u origin master`

Please notify once changes are done so that we can schedule a test and deployment

Deploying a cloud function

`firebase deploy --only functions`

Deploying to the site

`firebase deploy --only hosting:fundafrika`

## [GIT-FLOW](https://danielkummer.github.io/git-flow-cheatsheet/)

Start a new feature
`git flow feature start MYFEATURE `

Finish up a feature
`git flow feature finish MYFEATURE`

Publish a feature
`git flow feature publish MYFEATURE`

Getting a published feature
`git flow feature pull origin MYFEATURE `

Track a feature
`git flow feature track MYFEATURE `

Start a release 
`git flow release start RELEASE`

Publish a release
`git flow release publish RELEASE`

Track a release
`git flow release track RELEASE`

Finish up a release
`git flow release finish RELEASE `

Push the tags
`git push origin --tags`

Start a hotfix
`git flow hotfix start VERSION [BASENAME] `

Finish a hotfix
`git flow hotfix finish VERSION `

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
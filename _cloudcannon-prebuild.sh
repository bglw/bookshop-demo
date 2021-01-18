#!/usr/bin/env bash

npm_repo_install () {
	echo "📚 ---> Installing repo dependencies"
	npm install --only=dev --loglevel=error
}

build_bookshop () {
	echo "📚 ---> Installing bookshop dependencies"
	npm install --loglevel=error
	echo "📚 ---> Installing bookshop dev dependencies"
	npm install --only=dev --loglevel=error
	echo "📚 ---> Building bookshop"
	npm run build
	echo "📚 ---> Complete"
}

build_site_bookshop () {
	npm_repo_install
	echo "📚 ---> Entering Site directory"
	cd demo-site
	build_bookshop
}

build_hosted_bookshop () {
	echo "📚 ---> Entering Components directory"
	cd components
	echo "📚 ---> Cleaning modules"
	rm -rf node_modules
	echo "📚 ---> Installing bookshop dependencies"
	npm i
	echo "📚 ---> Building bookshop"
	npm run ci-build-storybook
	echo "📚 ---> Complete"
}

if [ "$BUILD_SITE" = 'true' ]; then
	echo "📚 ---> Running bookshop prebuild for Site"
 	build_site_bookshop
elif [ "$BUILD_STORYBOOK" = 'true' ]; then
	echo "📚 ---> Running hosted bookshop build"
	build_hosted_bookshop
else
 	echo "📚 ---> No prebuild variable found, skipping"
fi

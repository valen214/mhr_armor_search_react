


serve:
	yarn run start

build: ./src/*.ts
	yarn run build

serve_build:
	yarn nodemon server/index.ts

deploy:
	yarn run deploy

run:
	yarn run start

try:
	yarn rollup -c game_related.rollup.config.js
	copy dist\game-related.js public

try1:
	yarn webpack -c game_related_webpack.config.js
	copy dist\game-related.js public

try_monaco:
	yarn webpack-dev-server --hot \
		--port 3000 \
		--config monaco_webpack.config.js

# https://git-scm.com/book/en/v2/Git-Tools-Submodules
update:
#	git submodule update --remote my_common_react_components
# git submodule update --init --recursive
	git submodule update --remote --merge


push_submodule:
	git push --recurse-submodules=on-demand --remote my_common_react_components

init:
	git lfs track "*.clip"

# https://github.com/gpujs/gpu.js/

init_react:
# styled component

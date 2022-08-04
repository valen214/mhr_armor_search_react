


serve:
	yarn run start


run:
	yarn run start


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

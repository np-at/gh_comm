INSTALL_CMD=npm install --legacy-peer-deps
NODE_CMD:=$(shell command -s node)

help:
	@echo "${NODE_CMD}"

.PHONY: help

install:
	$(INSTALL_CMD)

define npm_script_targets
TARGETS := $(shell ${NODE_CMD} -e 'for (var k in require("./package.json").scripts) {console.log(k.replace(/:/g, "-"));}')
$$(TARGETS):
	npm run $(shell \
            	${NODE_CMD} -e 'for (var k in require("./package.json").scripts) {console.log(k.replace(/:/g, "-"), k);}' \
            		| egrep "^$(MAKECMDGOALS)\s" \
            		| head -n 1 \
            		| awk '{print $$2}' \
            	)

.PHONY: $$(TARGETS)
endef

$(eval $(call npm_script_targets))

#install:
#	$(INSTALL_CMD)
#
#.PHONY: install

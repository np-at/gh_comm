INSTALL_CMD=npm install --legacy-peer-deps


install:
	$(INSTALL_CMD)

.PHONY: install

define npm_script_targets
TARGETS := $(shell node -e 'for (var k in require("./package.json").scripts) {console.log(k.replace(/:/g, "-"));}')
$$(TARGETS):
	npm run $(shell \
            	node -e 'for (var k in require("./package.json").scripts) {console.log(k.replace(/:/g, "-"), k);}' \
            		| egrep "^$(MAKECMDGOALS)\s" \
            		| head -n 1 \
            		| awk '{print $$2}' \
            	)

.PHONY: $$(TARGETS)
endef

$(eval $(call npm_script_targets))
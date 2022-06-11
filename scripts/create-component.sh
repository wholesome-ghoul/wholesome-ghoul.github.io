#!/bin/bash

# USAGE:
#
# ./create-component.sh component-name

COMPONENT_NAME=$1

DIRECTORY_PATH="./src/packages/components/$COMPONENT_NAME"

if [ -d "$DIRECTORY_PATH" ]; then
  echo "[ *** ] component '$COMPONENT_NAME' exists."
  exit 0
fi

CAPITALIZED_COMPONENT_NAME="${COMPONENT_NAME^}"

mkdir -p $DIRECTORY_PATH
cd $DIRECTORY_PATH

mkdir tests

CYPRESS="tests/$CAPITALIZED_COMPONENT_NAME.spec.tsx"
STORY="$CAPITALIZED_COMPONENT_NAME.stories.mdx"
COMPONENT="$CAPITALIZED_COMPONENT_NAME"
STYLED_COMPONENT="Styled$CAPITALIZED_COMPONENT_NAME"

touch $CYPRESS $STORY $COMPONENT.tsx $STYLED_COMPONENT.tsx index.ts style.module.scss types.ts

echo "import { mount } from \"@cypress/react\";
import $CAPITALIZED_COMPONENT_NAME from \"../$CAPITALIZED_COMPONENT_NAME\";

describe(\"$CAPITALIZED_COMPONENT_NAME\", () => {
  it(\"renders\", () => {
    mount(<$CAPITALIZED_COMPONENT_NAME />);
  });
});
" > $CYPRESS

echo "import Props from \"./types\";
import styles from \"./style.module.scss\";
import $STYLED_COMPONENT from \"./$STYLED_COMPONENT\";

const $CAPITALIZED_COMPONENT_NAME = ({
  children,
  size,
  gridPosition,
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <$STYLED_COMPONENT
      className={className}
      {...styledProps}
    >
      {children}
    </$STYLED_COMPONENT>
  );
};

$CAPITALIZED_COMPONENT_NAME.defaultProps = {
  size: \"small\",
};

export default $CAPITALIZED_COMPONENT_NAME;
" > $COMPONENT.tsx

echo "import { BaseProps, Size } from \"../utils\";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
};

export default Props;
" > types.ts

echo "import styled, { css } from \"styled-components\";

import { GridPos } from \"../utils\";

const $STYLED_COMPONENT = styled.div\`
  \${({ rowPos, colPos }: GridPos) => css\`
    grid-row: \${rowPos};
    grid-column: \${colPos};
  \`}
\`;

export default $STYLED_COMPONENT;
" > $STYLED_COMPONENT.tsx

echo "export { default } from \"./$CAPITALIZED_COMPONENT_NAME\";" > index.ts

cd ..
ALL_COMPONENTS_INDEX=index.ts
echo "export { default as $CAPITALIZED_COMPONENT_NAME } from \"./$COMPONENT_NAME\";" >> $ALL_COMPONENTS_INDEX

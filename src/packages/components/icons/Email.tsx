import { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement> & {
  size: string | number,
};

const SvgEmail = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path
      d="M-32.889 197.745V5.757H479.08v383.976H-32.889Zm404.76 108.993c-24.263-25.848-52.276-54.935-62.252-64.637l-18.138-17.64-16.403 14.819c-19.426 17.55-30.908 22.461-52.506 22.461-19.712 0-28.911-4.544-49.728-24.566l-16.253-15.633-63.09 66.097-63.091 66.097h385.574ZM68.09 132.765 3.109 67.785V327.705l64.98-64.98 64.981-64.98Zm374.992 66.027V71.847l-63.997 63.903-63.997 63.903 62.95 63.042c34.623 34.673 63.421 63.042 63.997 63.042.576 0 1.047-57.125 1.047-126.945zM327.089 135.75l93.93-93.994H30.448l88.973 91.877c48.935 50.533 90.93 92.688 93.324 93.679 14.86 6.151 24.057-1.213 114.344-91.562z"
      transform="translate(32.889 -5.757)"
    />
  </svg>
);

SvgEmail.defaultProps = {
  size: "32px",
};
export default SvgEmail;

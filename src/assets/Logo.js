import React from "react";

const Logo = (props) => {
    const width = props.width ? props.width : 260
    const height = props.height ? props.height : 40
    return (
        <svg width={width} height={height} viewBox="0 0 260 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M79.5033 28.5282C78.3171 28.3879 77.1789 27.9728 76.1772 27.3153C75.1755 26.6577 74.3374 25.7754 73.7281 24.737C73.1188 23.6985 72.7546 22.532 72.6639 21.3281C72.5733 20.1242 72.7586 18.9153 73.2054 17.7956C73.6523 16.6759 74.3486 15.6756 75.2403 14.8723C76.132 14.069 77.1949 13.4846 78.3465 13.1644C79.498 12.8441 80.7071 12.7968 81.8797 13.0261C83.0523 13.2553 84.1568 13.7549 85.1072 14.4861C85.3878 14.6977 85.7142 14.8387 86.0593 14.8975C86.4045 14.9563 86.7586 14.9312 87.0923 14.8243C87.426 14.7173 87.7297 14.5317 87.9783 14.2826C88.227 14.0335 88.4134 13.7281 88.5222 13.3918L88.5557 13.2925C87.0671 11.6211 85.1116 10.4459 82.9479 9.9226C80.7843 9.39929 78.5144 9.55246 76.4387 10.3619C74.363 11.1713 72.5794 12.5987 71.3237 14.4554C70.0681 16.3121 69.3997 18.5104 69.407 20.7595C69.4143 23.0086 70.0969 25.2024 71.3645 27.0508C72.6321 28.8991 74.4249 30.3147 76.5058 31.1104C78.5867 31.9061 80.8575 32.0442 83.0178 31.5066C85.178 30.969 87.1259 29.781 88.6036 28.0997L86.3022 25.8191C85.4768 26.8011 84.4244 27.5621 83.2385 28.0347C82.0525 28.5073 80.7696 28.6768 79.5033 28.5282ZM46.8451 12.9947V23.2745C46.8451 24.7148 46.2792 26.096 45.2718 27.1144C44.2644 28.1328 42.8982 28.7049 41.4735 28.7049C40.0489 28.7049 38.6826 28.1328 37.6752 27.1144C36.6679 26.096 36.1019 24.7148 36.1019 23.2745V9.86916H33.0102V23.2745C33.0102 25.5437 33.9019 27.72 35.4891 29.3245C37.0762 30.9291 39.2289 31.8305 41.4735 31.8305C43.7181 31.8305 45.8708 30.9291 47.458 29.3245C49.0452 27.72 49.9368 25.5437 49.9368 23.2745V9.86916C49.1169 9.86916 48.3305 10.1985 47.7507 10.7846C47.1708 11.3708 46.8451 12.1658 46.8451 12.9947ZM3.16596 28.5064V9.86432C2.32629 9.86432 1.52102 10.2015 0.927286 10.8018C0.333555 11.402 0 12.2161 0 13.0649V31.5836H13.9067V28.5064H3.16596ZM138.555 9L129.093 31.5884H132.165L138.543 16.3237L144.108 29.6395C144.35 30.2146 144.754 30.705 145.27 31.0494C145.786 31.3939 146.39 31.5771 147.009 31.5763H147.993L138.555 9ZM106.752 13.0528V31.5884H109.918V9.86916H109.901C109.066 9.86916 108.265 10.2046 107.674 10.8016C107.083 11.3987 106.752 12.2085 106.752 13.0528Z" fill="#302F33"/>
                <path d="M79.5033 28.5282C78.3171 28.3879 77.1789 27.9728 76.1772 27.3153C75.1755 26.6577 74.3374 25.7754 73.7281 24.737C73.1188 23.6985 72.7546 22.532 72.6639 21.3281C72.5733 20.1242 72.7586 18.9153 73.2054 17.7956C73.6523 16.6759 74.3486 15.6756 75.2403 14.8723C76.132 14.069 77.1949 13.4846 78.3465 13.1644C79.498 12.8441 80.7071 12.7968 81.8797 13.0261C83.0523 13.2553 84.1568 13.7549 85.1072 14.4861C85.3878 14.6977 85.7142 14.8387 86.0593 14.8975C86.4045 14.9563 86.7586 14.9312 87.0923 14.8243C87.426 14.7173 87.7297 14.5317 87.9783 14.2826C88.227 14.0335 88.4134 13.7281 88.5222 13.3918L88.5557 13.2925C87.0671 11.6211 85.1116 10.4459 82.9479 9.9226C80.7843 9.39929 78.5144 9.55246 76.4387 10.3619C74.363 11.1713 72.5794 12.5987 71.3237 14.4554C70.0681 16.3121 69.3997 18.5104 69.407 20.7595C69.4143 23.0086 70.0969 25.2024 71.3645 27.0508C72.6321 28.8991 74.4249 30.3147 76.5058 31.1104C78.5867 31.9061 80.8575 32.0442 83.0178 31.5066C85.178 30.969 87.1259 29.781 88.6036 28.0997L86.3022 25.8191C85.4768 26.8011 84.4244 27.5621 83.2385 28.0347C82.0525 28.5073 80.7696 28.6768 79.5033 28.5282ZM46.8451 12.9947V23.2745C46.8451 24.7148 46.2792 26.096 45.2718 27.1144C44.2644 28.1328 42.8982 28.7049 41.4735 28.7049C40.0489 28.7049 38.6826 28.1328 37.6752 27.1144C36.6679 26.096 36.1019 24.7148 36.1019 23.2745V9.86916H33.0102V23.2745C33.0102 25.5437 33.9019 27.72 35.4891 29.3245C37.0762 30.9291 39.2289 31.8305 41.4735 31.8305C43.7181 31.8305 45.8708 30.9291 47.458 29.3245C49.0452 27.72 49.9368 25.5437 49.9368 23.2745V9.86916C49.1169 9.86916 48.3305 10.1985 47.7507 10.7846C47.1708 11.3708 46.8451 12.1658 46.8451 12.9947ZM3.16596 28.5064V9.86432C2.32629 9.86432 1.52102 10.2015 0.927286 10.8018C0.333555 11.402 0 12.2161 0 13.0649V31.5836H13.9067V28.5064H3.16596ZM138.555 9L129.093 31.5884H132.165L138.543 16.3237L144.108 29.6395C144.35 30.2146 144.754 30.705 145.27 31.0494C145.786 31.3939 146.39 31.5771 147.009 31.5763H147.993L138.555 9ZM106.752 13.0528V31.5884H109.918V9.86916H109.901C109.066 9.86916 108.265 10.2046 107.674 10.8016C107.083 11.3987 106.752 12.2085 106.752 13.0528Z" fill="#302F33"/>
            </g>
            <path d="M172.016 26.12C171.376 26.12 170.78 26.016 170.228 25.808C169.684 25.592 169.208 25.292 168.8 24.908C168.4 24.516 168.088 24.056 167.864 23.528C167.64 23 167.528 22.424 167.528 21.8C167.528 21.176 167.64 20.6 167.864 20.072C168.088 19.544 168.404 19.088 168.812 18.704C169.22 18.312 169.696 18.012 170.24 17.804C170.784 17.588 171.38 17.48 172.028 17.48C172.716 17.48 173.344 17.6 173.912 17.84C174.48 18.072 174.96 18.42 175.352 18.884L174.344 19.832C174.04 19.504 173.7 19.26 173.324 19.1C172.948 18.932 172.54 18.848 172.1 18.848C171.66 18.848 171.256 18.92 170.888 19.064C170.528 19.208 170.212 19.412 169.94 19.676C169.676 19.94 169.468 20.252 169.316 20.612C169.172 20.972 169.1 21.368 169.1 21.8C169.1 22.232 169.172 22.628 169.316 22.988C169.468 23.348 169.676 23.66 169.94 23.924C170.212 24.188 170.528 24.392 170.888 24.536C171.256 24.68 171.66 24.752 172.1 24.752C172.54 24.752 172.948 24.672 173.324 24.512C173.7 24.344 174.04 24.092 174.344 23.756L175.352 24.716C174.96 25.172 174.48 25.52 173.912 25.76C173.344 26 172.712 26.12 172.016 26.12ZM185.887 26.12C185.231 26.12 184.627 26.012 184.075 25.796C183.523 25.58 183.043 25.28 182.635 24.896C182.227 24.504 181.911 24.048 181.687 23.528C181.463 23 181.351 22.424 181.351 21.8C181.351 21.176 181.463 20.604 181.687 20.084C181.911 19.556 182.227 19.1 182.635 18.716C183.043 18.324 183.523 18.02 184.075 17.804C184.627 17.588 185.227 17.48 185.875 17.48C186.531 17.48 187.131 17.588 187.675 17.804C188.227 18.02 188.707 18.324 189.115 18.716C189.523 19.1 189.839 19.556 190.063 20.084C190.287 20.604 190.399 21.176 190.399 21.8C190.399 22.424 190.287 23 190.063 23.528C189.839 24.056 189.523 24.512 189.115 24.896C188.707 25.28 188.227 25.58 187.675 25.796C187.131 26.012 186.535 26.12 185.887 26.12ZM185.875 24.752C186.299 24.752 186.691 24.68 187.051 24.536C187.411 24.392 187.723 24.188 187.987 23.924C188.251 23.652 188.455 23.34 188.599 22.988C188.751 22.628 188.827 22.232 188.827 21.8C188.827 21.368 188.751 20.976 188.599 20.624C188.455 20.264 188.251 19.952 187.987 19.688C187.723 19.416 187.411 19.208 187.051 19.064C186.691 18.92 186.299 18.848 185.875 18.848C185.451 18.848 185.059 18.92 184.699 19.064C184.347 19.208 184.035 19.416 183.763 19.688C183.499 19.952 183.291 20.264 183.139 20.624C182.995 20.976 182.923 21.368 182.923 21.8C182.923 22.224 182.995 22.616 183.139 22.976C183.291 23.336 183.499 23.652 183.763 23.924C184.027 24.188 184.339 24.392 184.699 24.536C185.059 24.68 185.451 24.752 185.875 24.752ZM197.333 26V17.6H200.789C201.533 17.6 202.169 17.72 202.697 17.96C203.233 18.2 203.645 18.544 203.933 18.992C204.221 19.44 204.365 19.972 204.365 20.588C204.365 21.204 204.221 21.736 203.933 22.184C203.645 22.632 203.233 22.976 202.697 23.216C202.169 23.456 201.533 23.576 200.789 23.576H198.197L198.893 22.844V26H197.333ZM198.893 23.012L198.197 22.256H200.717C201.405 22.256 201.921 22.112 202.265 21.824C202.617 21.528 202.793 21.116 202.793 20.588C202.793 20.052 202.617 19.64 202.265 19.352C201.921 19.064 201.405 18.92 200.717 18.92H198.197L198.893 18.152V23.012ZM211.202 26V17.6H212.762V26H211.202ZM220.314 26V17.6H221.874V24.68H226.266V26H220.314ZM236.562 26.12C235.906 26.12 235.302 26.012 234.75 25.796C234.198 25.58 233.718 25.28 233.31 24.896C232.902 24.504 232.586 24.048 232.362 23.528C232.138 23 232.026 22.424 232.026 21.8C232.026 21.176 232.138 20.604 232.362 20.084C232.586 19.556 232.902 19.1 233.31 18.716C233.718 18.324 234.198 18.02 234.75 17.804C235.302 17.588 235.902 17.48 236.55 17.48C237.206 17.48 237.806 17.588 238.35 17.804C238.902 18.02 239.382 18.324 239.79 18.716C240.198 19.1 240.514 19.556 240.738 20.084C240.962 20.604 241.074 21.176 241.074 21.8C241.074 22.424 240.962 23 240.738 23.528C240.514 24.056 240.198 24.512 239.79 24.896C239.382 25.28 238.902 25.58 238.35 25.796C237.806 26.012 237.21 26.12 236.562 26.12ZM236.55 24.752C236.974 24.752 237.366 24.68 237.726 24.536C238.086 24.392 238.398 24.188 238.662 23.924C238.926 23.652 239.13 23.34 239.274 22.988C239.426 22.628 239.502 22.232 239.502 21.8C239.502 21.368 239.426 20.976 239.274 20.624C239.13 20.264 238.926 19.952 238.662 19.688C238.398 19.416 238.086 19.208 237.726 19.064C237.366 18.92 236.974 18.848 236.55 18.848C236.126 18.848 235.734 18.92 235.374 19.064C235.022 19.208 234.71 19.416 234.438 19.688C234.174 19.952 233.966 20.264 233.814 20.624C233.67 20.976 233.598 21.368 233.598 21.8C233.598 22.224 233.67 22.616 233.814 22.976C233.966 23.336 234.174 23.652 234.438 23.924C234.702 24.188 235.014 24.392 235.374 24.536C235.734 24.68 236.126 24.752 236.55 24.752ZM249.594 26V18.92H246.81V17.6H253.938V18.92H251.154V26H249.594Z" fill="#BA886E" />
            <defs>
                <clipPath id="clip0">
                    <rect width="148" height="23" fill="white" transform="translate(0 9)"/>
                </clipPath>
            </defs>
        </svg>
        //Logo for release
        // <svg width="148" height="40" viewBox="0 0 148 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <g>
        //         <path d="M79.5033 28.5282C78.3171 28.3879 77.1789 27.9728 76.1772 27.3153C75.1755 26.6577 74.3374 25.7754 73.7281 24.737C73.1188 23.6985 72.7546 22.532 72.6639 21.3281C72.5733 20.1242 72.7586 18.9153 73.2054 17.7956C73.6523 16.6759 74.3486 15.6756 75.2403 14.8723C76.132 14.069 77.1949 13.4846 78.3465 13.1644C79.498 12.8441 80.7071 12.7968 81.8797 13.0261C83.0523 13.2553 84.1568 13.7549 85.1072 14.4861C85.3878 14.6977 85.7142 14.8387 86.0593 14.8975C86.4045 14.9563 86.7586 14.9312 87.0923 14.8243C87.426 14.7173 87.7297 14.5317 87.9783 14.2826C88.227 14.0335 88.4134 13.7281 88.5222 13.3918L88.5557 13.2925C87.0671 11.6211 85.1116 10.4459 82.9479 9.9226C80.7843 9.39929 78.5144 9.55246 76.4387 10.3619C74.363 11.1713 72.5794 12.5987 71.3237 14.4554C70.0681 16.3121 69.3997 18.5104 69.407 20.7595C69.4143 23.0086 70.0969 25.2024 71.3645 27.0508C72.6321 28.8991 74.4249 30.3147 76.5058 31.1104C78.5867 31.9061 80.8575 32.0442 83.0178 31.5066C85.178 30.969 87.1259 29.781 88.6036 28.0997L86.3022 25.8191C85.4768 26.8011 84.4244 27.5621 83.2385 28.0347C82.0525 28.5073 80.7696 28.6768 79.5033 28.5282ZM46.8451 12.9947V23.2745C46.8451 24.7148 46.2792 26.096 45.2718 27.1144C44.2644 28.1328 42.8982 28.7049 41.4735 28.7049C40.0489 28.7049 38.6826 28.1328 37.6752 27.1144C36.6679 26.096 36.1019 24.7148 36.1019 23.2745V9.86916H33.0102V23.2745C33.0102 25.5437 33.9019 27.72 35.4891 29.3245C37.0762 30.9291 39.2289 31.8305 41.4735 31.8305C43.7181 31.8305 45.8708 30.9291 47.458 29.3245C49.0452 27.72 49.9368 25.5437 49.9368 23.2745V9.86916C49.1169 9.86916 48.3305 10.1985 47.7507 10.7846C47.1708 11.3708 46.8451 12.1658 46.8451 12.9947ZM3.16596 28.5064V9.86432C2.32629 9.86432 1.52102 10.2015 0.927286 10.8018C0.333555 11.402 0 12.2161 0 13.0649V31.5836H13.9067V28.5064H3.16596ZM138.555 9L129.093 31.5884H132.165L138.543 16.3237L144.108 29.6395C144.35 30.2146 144.754 30.705 145.27 31.0494C145.786 31.3939 146.39 31.5771 147.009 31.5763H147.993L138.555 9ZM106.752 13.0528V31.5884H109.918V9.86916H109.901C109.066 9.86916 108.265 10.2046 107.674 10.8016C107.083 11.3987 106.752 12.2085 106.752 13.0528Z" fill="#302F33"/>
        //         <path d="M79.5033 28.5282C78.3171 28.3879 77.1789 27.9728 76.1772 27.3153C75.1755 26.6577 74.3374 25.7754 73.7281 24.737C73.1188 23.6985 72.7546 22.532 72.6639 21.3281C72.5733 20.1242 72.7586 18.9153 73.2054 17.7956C73.6523 16.6759 74.3486 15.6756 75.2403 14.8723C76.132 14.069 77.1949 13.4846 78.3465 13.1644C79.498 12.8441 80.7071 12.7968 81.8797 13.0261C83.0523 13.2553 84.1568 13.7549 85.1072 14.4861C85.3878 14.6977 85.7142 14.8387 86.0593 14.8975C86.4045 14.9563 86.7586 14.9312 87.0923 14.8243C87.426 14.7173 87.7297 14.5317 87.9783 14.2826C88.227 14.0335 88.4134 13.7281 88.5222 13.3918L88.5557 13.2925C87.0671 11.6211 85.1116 10.4459 82.9479 9.9226C80.7843 9.39929 78.5144 9.55246 76.4387 10.3619C74.363 11.1713 72.5794 12.5987 71.3237 14.4554C70.0681 16.3121 69.3997 18.5104 69.407 20.7595C69.4143 23.0086 70.0969 25.2024 71.3645 27.0508C72.6321 28.8991 74.4249 30.3147 76.5058 31.1104C78.5867 31.9061 80.8575 32.0442 83.0178 31.5066C85.178 30.969 87.1259 29.781 88.6036 28.0997L86.3022 25.8191C85.4768 26.8011 84.4244 27.5621 83.2385 28.0347C82.0525 28.5073 80.7696 28.6768 79.5033 28.5282ZM46.8451 12.9947V23.2745C46.8451 24.7148 46.2792 26.096 45.2718 27.1144C44.2644 28.1328 42.8982 28.7049 41.4735 28.7049C40.0489 28.7049 38.6826 28.1328 37.6752 27.1144C36.6679 26.096 36.1019 24.7148 36.1019 23.2745V9.86916H33.0102V23.2745C33.0102 25.5437 33.9019 27.72 35.4891 29.3245C37.0762 30.9291 39.2289 31.8305 41.4735 31.8305C43.7181 31.8305 45.8708 30.9291 47.458 29.3245C49.0452 27.72 49.9368 25.5437 49.9368 23.2745V9.86916C49.1169 9.86916 48.3305 10.1985 47.7507 10.7846C47.1708 11.3708 46.8451 12.1658 46.8451 12.9947ZM3.16596 28.5064V9.86432C2.32629 9.86432 1.52102 10.2015 0.927286 10.8018C0.333555 11.402 0 12.2161 0 13.0649V31.5836H13.9067V28.5064H3.16596ZM138.555 9L129.093 31.5884H132.165L138.543 16.3237L144.108 29.6395C144.35 30.2146 144.754 30.705 145.27 31.0494C145.786 31.3939 146.39 31.5771 147.009 31.5763H147.993L138.555 9ZM106.752 13.0528V31.5884H109.918V9.86916H109.901C109.066 9.86916 108.265 10.2046 107.674 10.8016C107.083 11.3987 106.752 12.2085 106.752 13.0528Z" fill="#302F33"/>
        //     </g>
        //     <defs>
        //         <clipPath id="clip0">
        //             <rect width="148" height="23" fill="white" transform="translate(0 9)"/>
        //         </clipPath>
        //     </defs>
        // </svg>
    );
}

export default Logo;
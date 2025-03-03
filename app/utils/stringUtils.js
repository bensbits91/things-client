export const truncateString = (str, num) => {
   if (str?.length <= num) {
      return { newString: str, wasTruncated: false };
   }
   return { newString: str.slice(0, num) + '...', wasTruncated: true };
};

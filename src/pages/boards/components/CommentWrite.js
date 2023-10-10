import React from "react";

export const CommentWrite = () => {
    return (
      <div className="flex w-full items-start space-x-4 px-2">
        <div className="flex flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <form action="#" className="relative">
            <div className="overflow-hidden rounded-lg ">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                rows={5}
                name="comment"
                id="comment"
                className="block px-2 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Add your comment..."
                defaultValue={""}
              />
            </div>

            <div className="inset-x-0 bottom-0 flex justify-between py-2">
              <div className="flex items-center space-x-5"></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CommentWrite;

"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

const Popup: React.FC = () => {
  const badgeData = [
    {
      src: "https://media.licdn.com/dms/image/C4E12AQH-e2WPGP0YXQ/article-cover_image-shrink_600_2000/0/1649839178239?e=2147483647&v=beta&t=5uPmguARjr_MMdIw3QyUjtH9RbZQ8vTKuezgHQ_SFTc",
      url: "https://www.credly.com/badges/594e6cd4-a640-4e23-9f89-ddd2ef1f664b/linked_in_profile",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/624f533702b64e5c9c78e131/1678942955789-QY2AY83IJ497E181JUDZ/AI-900+Badge.png",
      url: "https://www.credly.com/badges/b00b0667-d014-41f6-8bb5-47985ecdc6e9/linked_in_profile",
    },
    {
      src: "https://crackcerts.com/uploads/course_image/az-900_1667391877.webp",
      url: "https://www.credly.com/badges/965700dd-65b1-4282-8fc4-a539b84d7a0e/linked_in_profile",
    },
    {
      src: "https://www.databricks.com/sites/default/files/2021/12/lakehouse-fundamentals.png",
      url: "https://credentials.databricks.com/82633c06-a728-40c9-95d3-6fee7d3cf855",
    },
    {
      src: "https://www.databricks.com/sites/default/files/2021/12/lakehouse-fundamentals.png",
      url: "/genai.png",
    }
  ];

  return (
    <div className="py-5 flex items-center justify-center h-2/3">
      <Modal>
        <ModalTrigger className="relative dark:bg-black dark:text-slate-200 bg-white text-black rounded-full flex items-center justify-center p-4 overflow-hidden group">
        <span className="absolute inset-0 bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] transition-opacity duration-500 opacity-100 rounded-full" />
        <span className="relative z-10 text-center transition-transform duration-500 group-hover:translate-x-40">
            See more ⚡
          </span>
          <div className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-500 -translate-x-40 group-hover:translate-x-0 z-20">
            ⚡
          </div>
          <div className="absolute inset-0 border-[1px] border-green-400 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="overflow-y-scroll">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
              My Achievements
            </h4>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 text-center mb-6">
              Here are some of the certifications in Azure Cloud and AI I have earned.<br /> Click on them to view details.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {badgeData.map((badge, index) => (
                <a
                  key={index}
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <img
                    src={badge.src}
                    alt={`Badge ${index + 1}`}
                    className="max-w-full h-auto rounded-lg w-40"
                  />
                </a>
              ))}
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Popup;

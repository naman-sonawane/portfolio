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
  // Dictionary with badge data including URLs
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
    <div className="py-5 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-slate-200 rounded-full dark:text-black text-slate-200 flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            See more
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          ⚡
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
              My Achievements
            </h4>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 text-center mb-6">
              Here are some of the certifications in Azure Cloud and AI I have earned.<br/> Click on them to view details.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                    className="max-w-full h-auto rounded-lg"
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
